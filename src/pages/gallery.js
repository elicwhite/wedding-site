import React, { useCallback, useState } from 'react';
import {useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';

import SEO from '../components/seo';
import Gallery from 'react-photo-gallery';

import { withPrivateRoute } from '../components/privateRoute';

function GalleryImage({ index, left, top, key, photo, onClick }) {
  return (
    <div
      onClick={(e) => {onClick(e, {index})}}
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
      allImages: allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const photos = data2.allImages.edges.map(edge => {
    const image= edge.node.childImageSharp.fluid;

    return {
      ...image,
      width: image.aspectRatio,
      height :1,
    }
  });

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <SEO title="Home" />
      <Gallery photos={photos} renderImage={GalleryImage} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
             <Carousel views={photos} currentIndex={currentImage} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};

export default withPrivateRoute(GalleryPage);
