'use client';
import { useGlobalData } from '@/hooks/useGlobalData';
import styles from './btnMenuToggle.module.scss';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function BtnMenuToggle() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	return <FaBarsStaggered className={styles.btnMenu} size={20} color={'#333'} onClick={() => setMenuOpen(!MenuOpen)} />;
}
