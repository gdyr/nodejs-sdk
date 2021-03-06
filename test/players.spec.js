const path = require('path');
const { expect } = require('chai');
const apiVideo = require('../lib');
const Player = require('../lib/Model/player');
const { ITEMS_TOTAL } = require('./api');

describe('Players ressource', () => {
  const client = new apiVideo.Client({ apiKey: 'test' });
  const properties = {
    shapeMargin: 10,
    shapeRadius: 3,
    shapeAspect: 'flat',
    shapeBackgroundTop: 'rgba(50, 50, 50, .7)',
    shapeBackgroundBottom: 'rgba(50, 50, 50, .8)',
    text: 'rgba(255, 255, 255, .95)',
    link: 'rgba(255, 0, 0, .95)',
    linkHover: 'rgba(255, 255, 255, .75)',
    linkActive: 'rgba(255, 0, 0, .75)',
    trackPlayed: 'rgba(255, 255, 255, .95)',
    trackUnplayed: 'rgba(255, 255, 255, .1)',
    trackBackground: 'rgba(0, 0, 0, 0)',
    backgroundTop: 'rgba(72, 4, 45, 1)',
    backgroundBottom: 'rgba(94, 95, 89, 1)',
    backgroundText: 'rgba(255, 255, 255, .95)',
    enableApi: true,
    enableControls: true,
    forceAutoplay: false,
    hideTitle: false,
    forceLoop: false,
  };

  describe('create', () => {
    it('Does not throw', async () => {
      await client.players.create(properties);
    });

    it('Sends good request', () => {
      client.players.create(properties).catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players',
        method: 'POST',
        headers: {},
        body: properties,
        json: true,
      });
    });
  });

  describe('update', () => {
    it('Does not throw', async () => {
      await client.players.update('plx1x1x1x1x1x1x1x1x1x', properties);
    });

    it('Sends good request', () => {
      client.players.update('plx1x1x1x1x1x1x1x1x1x', properties).catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players/plx1x1x1x1x1x1x1x1x1x',
        method: 'PATCH',
        headers: {},
        body: properties,
        json: true,
      });
    });
  });

  describe('get', () => {
    it('Sends good request', () => {
      client.players.get('plx1x1x1x1x1x1x1x1x1x').catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players/plx1x1x1x1x1x1x1x1x1x',
        method: 'GET',
        headers: {},
        json: true,
      });
    });

    it('Returns a player', async () => {
      const player = await client.players.get('plx1x1x1x1x1x1x1x1x1x');
      expect(player).to.have.keys(Object.keys(new Player()));
    });
  });

  describe('Search first page', () => {
    it('Sends good request', () => {
      const parameters = {
        currentPage: 1,
        pageSize: 25,
      };
      client.players.search(parameters).catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players?currentPage=1&pageSize=25',
        method: 'GET',
        headers: {},
        json: true,
      });
    });

    it('Returns an array', async () => {
      const parameters = {
        currentPage: 1,
        pageSize: 25,
      };
      const players = await client.players.search(parameters);
      expect(players).to.be.an.instanceOf(Array);
    });

    it('Retrieves only the first page ', async () => {
      const parameters = {
        currentPage: 1,
        pageSize: 25,
      };
      const players = await client.players.search(parameters);
      expect(players).to.have.lengthOf(parameters.pageSize);
    });
  });

  describe('Search without parameters', () => {
    it('Sends good request', () => {
      const parameters = {};
      client.players.search(parameters).catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players?pageSize=100&currentPage=1',
        method: 'GET',
        headers: {},
        json: true,
      });
    });

    it('Retrieves all pages ', async () => {
      const parameters = {};
      const players = await client.players.search(parameters);
      expect(players).to.have.lengthOf(ITEMS_TOTAL); // default page size is 100
    });
  });

  describe('Upload logo', () => {
    const source = path.join(__dirname, 'data/test.png');
    const playerId = 'plx1x1x1x1x1x1x1x1x1x';
    const link = 'https://api.video';

    it('Does not throw', async () => {
      await client.players.uploadLogo(source, playerId, link);
    });

    it('Sends good request', () => {
      client.players.uploadLogo(source, playerId, link).catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.property('url', 'https://ws.api.video/players/plx1x1x1x1x1x1x1x1x1x/logo');
      expect(client.players.browser.lastRequest).to.deep.property('method', 'POST');
      expect(client.players.browser.lastRequest).to.deep.property('headers', {});
      expect(client.players.browser.lastRequest.formData).to.be.an('object');
    });
  });

  describe('deleteLogo', () => {
    it('Does not throw', async () => {
      await client.players.deleteLogo('plx1x1x1x1x1x1x1x1x1x');
    });

    it('Sends good request', () => {
      client.players.deleteLogo('plx1x1x1x1x1x1x1x1x1x').catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players/plx1x1x1x1x1x1x1x1x1x/logo',
        method: 'DELETE',
        headers: {},
        json: true,
      });
    });
  });

  describe('delete', () => {
    it('Does not throw', async () => {
      await client.players.delete('plx1x1x1x1x1x1x1x1x1x');
    });

    it('Sends good request', () => {
      client.players.delete('plx1x1x1x1x1x1x1x1x1x').catch(() => {});
      expect(client.players.browser.lastRequest).to.deep.equal({
        url: 'https://ws.api.video/players/plx1x1x1x1x1x1x1x1x1x',
        method: 'DELETE',
        headers: {},
        json: true,
      });
    });
  });

  describe('cast', () => {
    it('Should return player object', () => {
      const data = {
        playerId: 'plx1x1x1x1x1x1x1x1x1x',
        shapeMargin: 10,
        shapeRadius: 3,
        shapeAspect: 'flat',
        shapeBackgroundTop: 'rgba(50, 50, 50, .7)',
        shapeBackgroundBottom: 'rgba(50, 50, 50, .8)',
        text: 'rgba(255, 255, 255, .95)',
        link: 'rgba(255, 0, 0, .95)',
        linkHover: 'rgba(255, 255, 255, .75)',
        linkActive: 'rgba(255, 0, 0, .75)',
        trackPlayed: 'rgba(255, 255, 255, .95)',
        trackUnplayed: 'rgba(255, 255, 255, .1)',
        trackBackground: 'rgba(0, 0, 0, 0)',
        backgroundTop: 'rgba(72, 4, 45, 1)',
        backgroundBottom: 'rgba(94, 95, 89, 1)',
        backgroundText: 'rgba(255, 255, 255, .95)',
        enableApi: true,
        enableControls: true,
        forceAutoplay: false,
        hideTitle: false,
        forceLoop: false,
        logo: {},
      };
      const player = client.players.cast(data);
      expect(player).to.deep.equal(data);
    });
  });
});
