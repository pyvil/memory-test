Project for testing people memory
==================================
Write on javascript + [jquery](https://github.com/jquery/jquery). 
Tested in [Mocha](https://github.com/mochajs/mocha) ([Mocha-jsdom](https://github.com/rstacruz/mocha-jsdom)) 
for DOM tests and [Jasmine](https://github.com/jasmine/jasmine) for internal stuff testing.


Testing env.
==============

For installed testing env was used *npm*

Two test frameworks were used: jasmine and mocha (with mocha-jsdom)

Install *jasmine*:
```
sudo npm install -g jasmine
```

To initialize *jasmine* simply write in the command line: **jasmine init**

Install *mocha* and *mocha-jsdom*:

```
sudo npm install -g mocha
sudo npm install jsdom
sudo npm install -g mocha-jsdom
```

Install another dependency:

```
npm install -g npm-check
npm install jquery --save-dev
npm install should
```

To initialize *mocha* simply write in command line: **mocha init**

To run *mocha* test run the command: 
```
npm test
```

If errors occurs run commands below:
```
npm install chai
npm install mocha-standard
npm install commander
```

And re-run *npm test*