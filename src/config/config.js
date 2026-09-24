const config = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL || 'https://sgp.cloud.appwrite.io/v1'),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || '69fcaa890008b330c258'),
    appWriteDbId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || '69fcbea200020991a41f'),
    appWriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID || import.meta.env.VITE_APPWRITE_COLLECTION_ID || 'articles'),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || '69fcc46f001f59d19e7b'),
};

export default config;