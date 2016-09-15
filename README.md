# Developers Site
Static site for the spanish developers community at
[desarrolladores.esri.es](http://desarrolladores.esri.es)

# Get ready to develop locally

## Prepare the environment

Software you need to install first:
 * [Jekyll](https://jekyllrb.com/)
 * [NodeJS](https://nodejs.org/en/)

Then you will be ready to install all the dependencies running:
```
npm install
bundle install
```

## Development mode:

Now you should be ready to preview you site running `jekyll serve`, but I
strongly recommend you to develop with livereload enabled:
`jekyll liveserve  --incremental`

## Build site
You should use a different **_config.yml** file for production, you can Build
your site running: `jekyll build --config=_config_prod.yml`
