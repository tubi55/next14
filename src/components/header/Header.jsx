import clsx from 'clsx';
import styles from './header.module.scss';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';
import BtnLogin from '../btnLogin/BtnLogin';
import { FaBarsStaggered } from 'react-icons/fa6';
//npm i react-icons

export default function Header() {
	return (
		<header className={clsx(styles.header)}>
			<h1>
				<Link href='/'>DCODELAB</Link>
			</h1>

			<div>
				<Navbar textArr={['about', 'youtube', 'post']} />
				<BtnLogin session={true} />
				<FaBarsStaggered size={20} color={'#333'} />
			</div>
		</header>
	);
}
