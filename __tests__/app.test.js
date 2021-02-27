require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const { myLocationFunction, myWeatherFunction, myReviewsFunction } = require('../lib/mungingfunctions.js');

describe('app routes', () => {
  describe('routes', () => {
    // let token;

    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token; // eslint-disable-line

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });

    test('returns city name and lat and long', async () => {
      const placeObject = [
        {
          'place_id': '282983083',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '186579',
          'boundingbox': [
            '45.432536',
            '45.6528812',
            '-122.8367489',
            '-122.4720252'
          ],
          'lat': '45.5202471',
          'lon': '-122.6741949',
          'display_name': 'Portland, Multnomah County, Oregon, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.75356571743377,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '236025890',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '132500',
          'boundingbox': [
            '43.606363',
            '43.727658',
            '-70.346095',
            '-70.076935'
          ],
          'lat': '43.6610277',
          'lon': '-70.2548596',
          'display_name': 'Portland, Cumberland County, Maine, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.65297101392868,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
      ];


      const expectation = {
        'formatted_query': 'Portland, Multnomah County, Oregon, USA',
        'latitude': '45.5202471',
        'longitude': '-122.6741949'
      };

      const data = myLocationFunction(placeObject);
      // .get('/animals')
      // .expect('Content-Type', /json/)
      // .expect(200);

      expect(data).toEqual(expectation);
    });

    test('returns weather', async () => {
      const placeObject = {
        'data': [

          {
            'moonrise_ts': 1614383988,
            'wind_cdir': 'W',
            'rh': 84,
            'pres': 1008.35,
            'high_temp': 9,
            'sunset_ts': 1614390822,
            'ozone': 398.827,
            'moon_phase': 0.996857,
            'wind_gust_spd': 17.5938,
            'snow_depth': 0,
            'clouds': 45,
            'ts': 1614326460,
            'sunrise_ts': 1614351153,
            'app_min_temp': -0.6,
            'wind_spd': 5.33688,
            'pop': 55,
            'wind_cdir_full': 'west',
            'slp': 1019.17,
            'moon_phase_lunation': 0.51,
            'valid_date': '2021-02-26',
            'app_max_temp': 9,
            'vis': 24.096,
            'dewpt': 3.4,
            'snow': 0,
            'uv': 1.20533,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 280,
            'max_dhi': null,
            'clouds_hi': 2,
            'precip': 1.3125,
            'low_temp': 2.4,
            'max_temp': 9.2,
            'moonset_ts': 1614353476,
            'datetime': '2021-02-26',
            'temp': 6,
            'min_temp': 3.4,
            'clouds_mid': 5,
            'clouds_low': 42
          }, {
            'moonrise_ts': 1614474955,
            'wind_cdir': 'WSW',
            'rh': 87,
            'pres': 1014.9,
            'high_temp': 7.8,
            'sunset_ts': 1614477306,
            'ozone': 365.531,
            'moon_phase': 0.974645,
            'wind_gust_spd': 11.5938,
            'snow_depth': 0,
            'clouds': 66,
            'ts': 1614412860,
            'sunrise_ts': 1614437449,
            'app_min_temp': -1.9,
            'wind_spd': 2.28695,
            'pop': 25,
            'wind_cdir_full': 'west-southwest',
            'slp': 1025.58,
            'moon_phase_lunation': 0.55,
            'valid_date': '2021-02-27',
            'app_max_temp': 7.8,
            'vis': 23.642,
            'dewpt': 2.8,
            'snow': 0,
            'uv': 2.57486,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 240,
            'max_dhi': null,
            'clouds_hi': 6,
            'precip': 0.375,
            'low_temp': 2.5,
            'max_temp': 7.8,
            'moonset_ts': 1614441402,
            'datetime': '2021-02-27',
            'temp': 5,
            'min_temp': 2.4,
            'clouds_mid': 22,
            'clouds_low': 64
          },
          {
            'moonrise_ts': 1614566004,
            'wind_cdir': 'SSE',
            'rh': 86,
            'pres': 1015.15,
            'high_temp': 10.4,
            'sunset_ts': 1614563789,
            'ozone': 325.542,
            'moon_phase': 0.925484,
            'wind_gust_spd': 5.89844,
            'snow_depth': 0,
            'clouds': 48,
            'ts': 1614499260,
            'sunrise_ts': 1614523743,
            'app_min_temp': -1.6,
            'wind_spd': 1.35305,
            'pop': 0,
            'wind_cdir_full': 'south-southeast',
            'slp': 1025.78,
            'moon_phase_lunation': 0.58,
            'valid_date': '2021-02-28',
            'app_max_temp': 10.4,
            'vis': 17.9492,
            'dewpt': 3.6,
            'snow': 0,
            'uv': 3.76181,
            'weather': {
              'icon': 'c03d',
              'code': 803,
              'description': 'Broken clouds'
            },
            'wind_dir': 168,
            'max_dhi': null,
            'clouds_hi': 23,
            'precip': 0,
            'low_temp': 2.8,
            'max_temp': 10.4,
            'moonset_ts': 1614529252,
            'datetime': '2021-02-28',
            'temp': 6,
            'min_temp': 2.6,
            'clouds_mid': 42,
            'clouds_low': 25
          },
        ]
      };



      const expectation = [
        {
          'forecast': 'Broken clouds',
          'time': 'Fri Feb 26 2021'
        },
        {
          'forecast': 'Broken clouds',
          'time': 'Sat Feb 27 2021'
        },
        {
          'forecast': 'Broken clouds',
          'time': 'Sun Feb 28 2021'
        },

      ];

      const data = myWeatherFunction(placeObject);
      // .get('/animals')
      // .expect('Content-Type', /json/)
      // .expect(200);

      expect(data).toEqual(expectation);
    });

    test('returns city name and lat and long', async () => {
      const placeObject = {
        'businesses': [
          {
            'id': 'Ys42wLKqrflqmtqkgqOXgA',
            'alias': 'luc-lac-portland-7',
            'name': 'Luc Lac',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=vLJ6J6ds11o024Y5tvv5yg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vLJ6J6ds11o024Y5tvv5yg',
            'review_count': 3205,
            'categories': [
              {
                'alias': 'vietnamese',
                'title': 'Vietnamese'
              },
              {
                'alias': 'tapasmallplates',
                'title': 'Tapas/Small Plates'
              },
              {
                'alias': 'cocktailbars',
                'title': 'Cocktail Bars'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 45.516868,
              'longitude': -122.675447
            },
            'transactions': [
              'pickup',
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '835 SW 2nd Ave',
              'address2': null,
              'address3': '',
              'city': 'Portland',
              'zip_code': '97204',
              'country': 'US',
              'state': 'OR',
              'display_address': [
                '835 SW 2nd Ave',
                'Portland, OR 97204'
              ]
            },
            'phone': '+15032220047',
            'display_phone': '(503) 222-0047',
            'distance': 1312.1776320869053
          },
          {
            'id': 'OQ2oHkcWA8KNC1Lsvj1SBA',
            'alias': 'screen-door-portland',
            'name': 'Screen Door',
            'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/screen-door-portland?adjust_creative=vLJ6J6ds11o024Y5tvv5yg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vLJ6J6ds11o024Y5tvv5yg',
            'review_count': 7227,
            'categories': [
              {
                'alias': 'southern',
                'title': 'Southern'
              },
              {
                'alias': 'cajun',
                'title': 'Cajun/Creole'
              },
              {
                'alias': 'breakfast_brunch',
                'title': 'Breakfast & Brunch'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 45.52309,
              'longitude': -122.64164
            },
            'transactions': [
              'pickup',
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '2337 E Burnside St',
              'address2': null,
              'address3': '',
              'city': 'Portland',
              'zip_code': '97214',
              'country': 'US',
              'state': 'OR',
              'display_address': [
                '2337 E Burnside St',
                'Portland, OR 97214'
              ]
            },
            'phone': '+15035420880',
            'display_phone': '(503) 542-0880',
            'distance': 3277.209321613324
          },
        ]
      };


      const expectation = [
        {
          'name': 'Luc Lac',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=vLJ6J6ds11o024Y5tvv5yg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vLJ6J6ds11o024Y5tvv5yg'
        },
        {
          'name': 'Screen Door',
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg',
          'price': '$$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/screen-door-portland?adjust_creative=vLJ6J6ds11o024Y5tvv5yg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vLJ6J6ds11o024Y5tvv5yg',
        }
      ];

      const data = myReviewsFunction(placeObject);
      // .get('/animals')
      // .expect('Content-Type', /json/)
      // .expect(200);

      expect(data).toEqual(expectation);
    });
  });
});
