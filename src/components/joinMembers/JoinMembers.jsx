'use client';
import clsx from 'clsx';
import styles from './joinMembers.module.scss';
import { addUser } from '@/lib/actions';

export default function JoinMembers() {
	return (
		<form className={clsx(styles.joinMembers)} action={addUser}>
			<input type='text' name='username' placeholder='user name' />
			<input type='email' name='email' placeholder='email' />
			<input type='password' name='password' placeholder='password' />
			<input type='password' name='repassword' placeholder='re-password' />

			<input type='reset' value='cancel' />
			<input type='submit' value='register' />
		</form>
	);
}