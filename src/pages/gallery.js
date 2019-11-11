import React, { useCallback, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';

import SEO from '../components/seo';
import Gallery from 'react-photo-gallery';

import { withPrivateRoute } from '../components/privateRoute';

function GalleryImage({ index, left, top, key, photo, onClick }) {
  return (
    <div
      onClick={e => {
        onClick(e, { index });
      }}
      key={key}
    >
      <Img
        fluid={photo}
        style={{ margin: 2, height: photo.height, width: photo.width }}
      />
    </div>
  );
}

const GalleryPage = () => {
  const data2 = useStaticQuery(graphql`
    query {
      allImages: allFile(filter: { sourceInstanceName: { eq: "gallery" } }) {
        edges {
          node {
            sourceInstanceName
            childImageSharp {
              preview: fluid(maxWidth: 300, quality: 100) {
                ...GatsbyImageSharpFluid
              }
              fullscreen: fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const previewPhotos = data2.allImages.edges.map(edge => {
    const image = edge.node.childImageSharp.preview;

    return {
      ...image,
      width: image.aspectRatio,
      height: 1,
    };
  });

  const fullscreenPhotos = data2.allImages.edges.map(edge => {
    const image = edge.node.childImageSharp.fullscreen;

    return {
      ...image,
      width: image.aspectRatio,
      height: 1,
    };
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setViewerIsOpen(false);
    setCurrentImage(0);
  };

  return (
    <>
      <SEO title="Home" />
      <Gallery
        photos={previewPhotos}
        renderImage={GalleryImage}
        onClick={openLightbox}
      />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel views={fullscreenPhotos} currentIndex={currentImage} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};

export default withPrivateRoute(GalleryPage);
