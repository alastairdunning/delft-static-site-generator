import React from 'react';
import PropTypes from 'prop-types';
import IIIFIcon from '../../../public/icons/logo-iiif-34x30.png';
import './IIIFLink.scss';

const GITHUB_BASE = 'https://github.com/digirati-co-uk/delft-static-site-generator/blob/master/';
const RAW_BASE = 'https://raw.githubusercontent.com/digirati-co-uk/delft-static-site-generator/master/src';

const getIIIFLink = (href) => {
  if (/\/(collections|objects|exhibitions)\//.test(href)) {
    const baselink = `${href.replace(/(en|nl)/, `${GITHUB_BASE}src`)}.json`;
    const manifest = `${href.replace(/(en|nl)/, `?manifest=${RAW_BASE}`)}.json`;
    return baselink + manifest;
  }
  return `${GITHUB_BASE}content/${href}.md`;
};

const IIIFLink = ({ href }) => (
  <a className="iiif-link-wrapper" href={getIIIFLink(href)}>
    <img src={IIIFIcon} alt="IIIF logo" />
    IIIF Manifest
  </a>
);


IIIFLink.propTypes = {
  href: PropTypes.string.isRequired,
};


export { IIIFLink };
