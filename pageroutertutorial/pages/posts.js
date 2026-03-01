import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';

export default function post() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1> fuera de la carpeta</h1>
        </Layout>
    );
}