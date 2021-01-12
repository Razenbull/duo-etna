import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

const config = {
  baseUrl: 'https://etna-nuxt-prismic.cdn.prismic.io/api/v2',
};

export const initApi = req => {
  return Prismic.getApi(config.baseUrl, {
    req: req,
  });
};

export const linkResolver = doc => {
  if (doc.type === 'blog_post') return `/blog/${doc.uid}`;
  return `/${doc.uid}`;
};

export const generatePageData = (documentType, data) => {
  switch (documentType) {
    case 'homepage':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        intro: PrismicDOM.RichText.asText(data.intro),
        background: data.background.url,
        videoOptions: {
          autoplay: false,
          controls: true,
          preload: 'auto',
          poster: data.background.url,
          sources: [
            {
              src: data.video.url,
              type: 'video/mp4',
            },
          ],
        },
      };

    case 'aboutpage':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        background: data.background.url,
        backgroundMobile: data.background_mobile ? data.background_mobile.url : false,
        aboutSections: data.about_section.map(section => ({
          title: PrismicDOM.RichText.asText(section.section_title),
          text: PrismicDOM.RichText.asHtml(section.section_text),
          image: section.section_image.url,
          link: section.section_link,
        })),
      };

    case 'workspage':
      let worksPage = data.find(document => document.type === 'workspage');

      return {
        title: PrismicDOM.RichText.asText(worksPage.data.title),
        background: worksPage.data.background.url,
        backgroundMobile: worksPage.data.background_mobile
          ? worksPage.data.background_mobile.url
          : false,
        sections: [
          {
            title: 'collaborations',
            link: 'collaborations',
          },
          {
            title: 'videos',
            link: 'videos',
          },
          {
            title: 'repertory',
            link: 'repertory',
          },
        ],
        collaborations: data
          .filter(document => document.type === 'work' && document.tags.includes('collaboration'))
          .map(work => {
            return {
              ...work,
              name: PrismicDOM.RichText.asText(work.data.name),
              image: work.data.image.url,
              with: PrismicDOM.RichText.asText(work.data.with),
            };
          }),
        videos: data
          .filter(document => document.type === 'video')
          .map(video => {
            return {
              ...video,
              title: PrismicDOM.RichText.asText(video.data.title),
              imageThumbnail: video.data.image_thumbnail.url,
              shortDescription: PrismicDOM.RichText.asText(video.data.short_description),
            };
          }),
        repertory: data
          .filter(document => document.type === 'work' && document.tags.includes('repertory'))
          .map(work => {
            return {
              ...work,
              categories: work.data.body.map(element =>
                PrismicDOM.RichText.asHtml(element.primary.text),
              ),
            };
          }),
      };

    case 'works/:id':
      return {
        background: data.background.url,
        image: data.image,
        project: PrismicDOM.RichText.asText(data.name),
        project_description: PrismicDOM.RichText.asHtml(data.project_description),
        artiste_description: PrismicDOM.RichText.asHtml(data.artiste_description),
        collabWith: PrismicDOM.RichText.asText(data.with),
        videos: data.body.map(element =>
          element.primary.video.url.replace('vimeo.com/', 'player.vimeo.com/video/'),
        ),
      };

    case 'videos/:id':
      return {
        background: data.image.url,
        title: PrismicDOM.RichText.asText(data.title),
        videos: data.body.map(element => {
          return {
            title: PrismicDOM.RichText.asText(element.primary.video_title),
            video: element.primary.video_link.url.replace('vimeo.com/', 'player.vimeo.com/video/'),
            caption: PrismicDOM.RichText.asText(element.primary.video_caption),
            description: PrismicDOM.RichText.asText(element.primary.video_description),
          };
        }),
      };

    case 'newspage':
      let newsPage = data.find(document => document.type === 'newspage');

      return {
        title: PrismicDOM.RichText.asText(newsPage.data.title),
        background: newsPage.data.background.url,
        backgroundMobile: newsPage.data.background_mobile
          ? newsPage.data.background_mobile.url
          : false,
        news: data
          .filter(document => document.type === 'news')
          .map(news => {
            return {
              ...news,
              content: PrismicDOM.RichText.asHtml(news.data.content),
            };
          }),
      };

    case 'concertspage':
      let concertsPage = data.find(document => document.type === 'concertspage');
      return {
        title: PrismicDOM.RichText.asText(concertsPage.data.title),
        background: concertsPage.data.background.url,
        backgroundMobile: concertsPage.data.background_mobile
          ? concertsPage.data.background_mobile.url
          : false,
        concerts: data
          .filter(document => document.type === 'concert')
          .sort((a, b) => new Date(b.data.from) - new Date(a.data.from))
          .map(concert => {
            return {
              ...concert,
              place: PrismicDOM.RichText.asText(concert.data.place),
              associated_project: PrismicDOM.RichText.asText(concert.data.associated_project),
              address: PrismicDOM.RichText.asText(concert.data.address),
              description: PrismicDOM.RichText.asHtml(concert.data.description),
              from: PrismicDOM.Date(concert.data.from),
              to: PrismicDOM.Date(concert.data.to),
            };
          }),
      };

    case 'contactpage':
      return {
        title: PrismicDOM.RichText.asText(data.title),
        background: data.background.url,
        backgroundMobile: data.background_mobile ? data.background_mobile.url : false,
      };

    case 'newsletter_form':
      return {
        button: PrismicDOM.RichText.asText(data.button),
        label: PrismicDOM.RichText.asText(data.label),
        placeholder: PrismicDOM.RichText.asText(data.placeholder),
      };
  }
};
