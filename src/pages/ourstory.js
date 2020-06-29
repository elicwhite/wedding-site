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

      engagement2: allFile(
        filter: { sourceInstanceName: { eq: "engagement2" } }
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
  const [engagement2PreviewPhotos, engagement2FullscreenPhotos] = getPhotos(
    data2.engagement2
  );
  const [travelPreviewPhotos, travelFullscreenPhotos] = getPhotos(data2.travel);
  const [howwemetPreviewPhotos, howwemetFullscreenPhotos] = getPhotos(
    data2.howwemet
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenPhotos, setFullscreenPhotos] = useState(
    engagement2FullscreenPhotos
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
      <SEO title="Home" />
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Pandemic?!</h3>
          <div className="caps-subheader accent">March 2020 - Unknown</div>
          <p>
            Well this wasn’t part of the plan! Due to the COVID-19 pandemic
            we’ve decided to postpone our wedding until 2021. We hope that
            everyone is staying home, wearing a mask when going out, and staying
            healthy.
          </p>
          <p>
            Just before the Bay Area’s shelter in place order we took some
            photos to document and celebrate our engagement &mdash; here are
            some of our favorites. Although our wedding is a bit further away
            now, we are finding joy in some unexpected quality time, and really
            getting some mileage out of the title fiancé! We are so looking
            forward to getting to see everyone in person and celebrating our
            love in an environment where we can all feel comfortable being
            together. We are hoping and planning that this will be with all of
            you on August 28, 2021!
          </p>

          <Gallery
            photos={engagement2PreviewPhotos}
            renderImage={GalleryImage}
            onClick={openLightbox.bind(null, engagement2FullscreenPhotos)}
            margin={MARGIN}
          />
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Engagement</h3>
          <div className="caps-subheader accent">September 7th 2019</div>
          <p>
            On our first night in Mallorca, Spain (Balearic Islands) after
            traveling to Poland and Germany &mdash; we had arranged to take a
            sunset hot air balloon ride. With some additional planning and a
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
              title="Eli's Proposal Video"
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
          <div className="caps-subheader accent narrow-column">
            Austria, Denmark, England, France, Germany, Israel, Italy, Japan,
            Mexico, Poland, Spain
          </div>
          <p>
            Over the past 4 years we have been fortunate to be able to travel
            the world! So far we’ve been to 11 countries together! Inspired by
            Eli’s globetrotting past we’ve visited some familiar locations, and
            many new ones, and have enjoyed sharing these experiences with each
            other. We look forward to seeing some exciting new destinations in
            2021 and beyond.
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
          <p>
            We both came to the Bay Area to follow our careers in tech. We met
            through an online dating site and clicked right away after a
            chocolate fondue first date. Now, Eli works as a Software
            Engineering Manager on the React Native Team at Facebook and Holly
            works as a User Experience Engineering Manager on internal tools at
            Apple. Together, we built and designed this website!
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
