import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { TranslatorProvider } from 'react-translate';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import './layout.css';
import '../delft-styles.scss';
import withLocation from '../withLocation/withLocation';
import defaultImage from '../../images/defaultSocial.jpg';
import translations from '../../translations';

class Layout extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                url
                twitterHandle
              }
            }
          }
        `}
        render={data => (
          <TranslatorProvider
            translations={translations[this.props.language] || translations.en}
          >
            <React.Fragment>
              <Helmet
                title={data.site.siteMetadata.title}
                meta={[
                  {
                    name: 'keywords',
                    content:
                      'academic heritage, heritage, special collections, library, history, technology, iiif, open source',
                  },
                  {
                    name: 'twitter:image',
                    content:
                      this.props.meta && this.props.meta.image
                        ? this.props.meta.image
                        : 'https://dlc.services/iiif-img/7/17/b9a7d3c2-35a3-447c-9191-bef328ee312d/full/!800,800/0/default.jpg',
                  },
                  {
                    name: 'twitter:title',
                    content: data.site.siteMetadata.title,
                  },
                  {
                    name: 'twitter:description',
                    content:
                      this.props.meta && this.props.meta.description
                        ? this.props.meta.description
                        : 'Explore the history of Delft University of Technology and the Special Collections of TU Delft Library.',
                  },
                  { name: 'twitter:card', content: 'summary' },
                  {
                    name: 'og:url',
                    content: this.props.location.href
                      ? this.props.location.href
                      : 'https://https://erfgoed.tudelft.nl/nl',
                  },
                  { name: 'og:type', content: 'website' },
                  { name: 'og:title', content: data.site.siteMetadata.title },
                  {
                    name: 'og:image',
                    content:
                      this.props.meta && this.props.meta.image
                        ? this.props.meta.image
                        : 'https://dlc.services/iiif-img/7/17/b9a7d3c2-35a3-447c-9191-bef328ee312d/full/!800,800/0/default.jpg',
                  },
                  {
                    name: 'og:description',
                    content:
                      this.props.meta && this.props.meta.description
                        ? this.props.meta.description
                        : 'Explore the history of Delft University of Technology and the Special Collections of TU Delft Library.',
                  },
                ]}
              >
                <html lang={this.props.language} />
              </Helmet>
              <Header language={this.props.language} path={this.props.path} />
              {this.props.children}
              <Footer
                path={this.props.location.href}
                title={data.site.siteMetadata.title}
                twitterHandle={data.site.siteMetadata.twitterHandle}
                description={
                  this.props.meta && this.props.meta.description
                    ? this.props.meta.description
                    : 'Explore the history of Delft University of Technology and the Special Collections of TU Delft Library.'
                }
              />
            </React.Fragment>
          </TranslatorProvider>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default withLocation(Layout);
