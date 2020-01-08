import React, { useCallback, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';

import SEO from '../components/seo';
import Gallery from 'react-photo-gallery';

import { withPrivateRoute } from '../components/privateRoute';

const MARGIN = 4;

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
        style={{
          margin: MARGIN,
          height: photo.height,
          width: photo.width,
          cursor: 'pointer',
        }}
      />
    </div>
  );
}

export const query = graphql`
  fragment PhotoImage on File {
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
`;

function getPhotos(images) {
  const previewPhotos = images.edges.map(edge => {
    const image = edge.node.childImageSharp.preview;

    return {
      ...image,
      width: image.aspectRatio,
      height: 1,
    };
  });

  const fullscreenPhotos = images.edges.map(edge => {
    const image = edge.node.childImageSharp.fullscreen;

    return {
      ...image,
      width: image.aspectRatio,
      height: 1,
    };
  });

  return [previewPhotos, fullscreenPhotos];
}

const GalleryPage = () => {
  const data2 = useStaticQuery(graphql`
    query {
      engagement: allFile(
        filter: { sourceInstanceName: { eq: "engagement" } }
      ) {
        edges {
          node {
            ...PhotoImage
          }
        }
      }

      travel: allFile(filter: { sourceInstanceName: { eq: "travel" } }) {
        edges {
          node {
            ...PhotoImage
          }
        }
      }

      howwemet: allFile(filter: { sourceInstanceName: { eq: "howwemet" } }) {
        edges {
          node {
            ...PhotoImage
          }
        }
      }
    }
  `);

  const [engagementPreviewPhotos, engagementFullscreenPhotos] = getPhotos(
    data2.engagement
  );
  const [travelPreviewPhotos, travelFullscreenPhotos] = getPhotos(data2.travel);
  const [howwemetPreviewPhotos, howwemetFullscreenPhotos] = getPhotos(
    data2.howwemet
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenPhotos, setFullscreenPhotos] = useState(
    engagementFullscreenPhotos
  );
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((photos, event, { photo, index }) => {
    setFullscreenPhotos(photos);
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setViewerIsOpen(false);
    setCurrentImage(0);
  };

  const videoAspectRatioPercentage = (315 / 560) * 100;

  return (
    <>
      <div className="section">
        <div className="section-container">
          <SEO title="Home" />
          <h3 className="cursive">Engagement</h3>
          <div className="caps-subheader accent">September 7th 2019</div>
          <p className="narrow-column">
            On their first night in Mallorca, Spain (Balearic Islands) after
            traveling to Poland and Germany - Holly and Eli had arranged to take
            a sunset hot air balloon ride. With some additional planning and a
            gorgeous ring he picked himself, Eli turned this outing into a
            perfect surprise proposal!
          </p>
          <Gallery
            photos={engagementPreviewPhotos}
            renderImage={GalleryImage}
            onClick={openLightbox.bind(null, engagementFullscreenPhotos)}
            margin={MARGIN}
          />
          <div
            style={{
              paddingTop: `${videoAspectRatioPercentage}%`,
              position: 'relative',
              margin: MARGIN,
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src="https://www.youtube.com/embed/Tczp4_kkVus"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Travel</h3>
          <div className="caps-subheader accent">
            Austria, Denmark, England, France, Germany, Israel, Italy, Japan,
            Mexico, Poland, Spain
          </div>
          <p className="narrow-column">
            Over the past 4 years Eli and Holly have been fortunate to be able
            to travel the world! So far they’ve been to 11 countries together!
            Inspired by Eli’s globetrotting past they’ve visited some familiar
            locations and many new ones and have enjoyed sharing these
            experiences with each other. They look forward to seeing some
            exciting new destinations in 2020.
          </p>
          <Gallery
            photos={travelPreviewPhotos}
            renderImage={GalleryImage}
            onClick={openLightbox.bind(null, travelFullscreenPhotos)}
            margin={MARGIN}
          />
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">How We Met</h3>
          <div className="caps-subheader accent">September 2015</div>
          <p className="narrow-column">
            Eli and Holly both came to the Bay Area to follow their careers in
            tech. They met through an online dating site and clicked right away
            after a chocolate fondue first date. Now, Eli works as a Software
            Engineer on the React Native Team at Facebook and Holly works as a
            User Experience Software Engineer on internal tools at Apple.
            Together, they built and designed this website!
          </p>
          <Gallery
            photos={howwemetPreviewPhotos}
            renderImage={GalleryImage}
            onClick={openLightbox.bind(null, howwemetFullscreenPhotos)}
            margin={MARGIN}
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  views={fullscreenPhotos}
                  currentIndex={currentImage}
                  styles={{
                    footerCaption: () => ({
                      fontSize: '18px',
                    }),
                    footerCount: () => ({
                      fontSize: '18px',
                    }),
                  }}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    </>
  );
};

export default withPrivateRoute(GalleryPage);
