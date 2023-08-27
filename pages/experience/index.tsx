import Card from '@/components/Card';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import config from 'config';
import { RoughNotation } from 'react-rough-notation';

export default function Experience() {
  return (
    <>
      <PageSEO
        title={`Experience - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Experience' />
        <div className='container py-12'>
          <div className='-m-4 flex flex-wrap'>
            <p>What are you doing here?</p>
            <p>I'll be doing some stuff here soon, in the meantime.</p>
            <p>
              Just{' '}
              <a
                href='/static/bjorn_resume_eng.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                download my resume
              </a>
              .
            </p>
            {/*{config.projects.map(({ slug, title, description, banner }) => (
                            <Card
                                key={slug}
                                title={title}
                                description={description}
                                banner={banner}
                                href={`/projects/${slug}`}
                            />
                        )}*/}
          </div>
        </div>
      </div>
    </>
  );
}
