import clsx from 'clsx';
import styles from './post.module.scss';
import { getPostsPage } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/pagination/Pagination';
import { auth } from '@/lib/auth';

export default async function Post({ searchParams }) {
	const session = await auth();
	const page = searchParams?.page || 1;
	const { total, posts, nums } = await getPostsPage(page);

	return (
		<section className={clsx(styles.post)}>
			<h1>Post</h1>
			<Pagination total={total} nums={nums} />
			<nav>
				<Link href='/post/write'>Write Post</Link>
			</nav>

			{posts.map(post => (
				<article key={post._id}>
					<div className={clsx(styles.pic)}>{post.img && <Image src={post.img} alt={post.title} priority fill />}</div>
					<h2>
						<Link href={`/post/${post._id}`}>{post.title}</Link>
					</h2>
					<p>{post.desc}</p>
				</article>
			))}
		</section>
	);
}
