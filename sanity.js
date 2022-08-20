import sanityClient from '@sanity/client';
import ImageUrlBuilder  from '@sanity/image-url';
const client = sanityClient({
    projectId: "fhh1a7be",
    dataset: 'production',
    useCdn:true,
    apiVersion: '2021-03-25'
});

const builder= ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

//RUN THIS to add exception for localhost 3000 CORS policy
//sanity cors add http://localhost:19006

export default client;