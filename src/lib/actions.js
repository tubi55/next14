'use server';
//해당 액션함수파일에서 서버컴포넌트뿐만 아닌 클라이언트 컴포넌트에서도 호출하는 함수가 있다면
//함수안쪽에 각각 입력하는 것이 해당 파일 상단에 등록 (추천)
//아니면 클라이언트 컴포넌트에서 호출하는 action함수를 다른 파일로 분리
import { revalidatePath } from 'next/cache';
import { connectDB } from './connectDB';
import { Post, User } from './models';
import { redirect } from 'next/navigation';

export const getPosts = async id => {
	try {
		connectDB();
		let posts = null;
		if (id) posts = await Post.findById(id);
		else posts = await Post.find().sort({ _id: -1 });
		return posts;
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const getPostsPage = async page => {
	const nums = 6;

	try {
		connectDB();
		const total = await Post.find().sort({ _id: -1 }).count();
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(nums)
			.skip(nums * (page - 1));
		return { total, posts, nums };
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const addPost = async formData => {
	const { title, img, desc } = Object.fromEntries(formData);

	try {
		connectDB();
		const newPost = new Post({ title, img, desc });
		await newPost.save();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save Post!');
	}

	revalidatePath('/post');
	redirect('/post');
};

export const deletePost = async formData => {
	try {
		connectDB();
		const data = Object.fromEntries(formData);
		//const id = { _id: Object.keys(data)[0] };
		const id = Object.keys(data)[0];

		//findByAndDelete(id); id:삭제할 document의 _id의 value값 전달 (객체전달 아님)
		await Post.findByIdAndDelete(id);
	} catch (err) {
		console.log(err);
		throw new Error('Fail to delete Post');
	}

	revalidatePath('/post');
	redirect('/post');
};

export const updatePost = async formData => {
	const { id, title, img, desc } = Object.fromEntries(formData);
	const updateObject = { title, img, desc };

	try {
		connectDB();
		await Post.findByIdAndUpdate(id, updateObject);
	} catch (err) {
		console.log(err);
		throw new Error('Fail to Update Post!!');
	}

	revalidatePath('/post');
	redirect('/post');
};

//User 관련 actions
export const addUser = async formData => {
	const { username, email, password, repassword } = Object.fromEntries(formData);
	if (password !== repassword) return;

	try {
		connectDB();
		const newUser = new User({ username, email, password });
		await newUser.save();
	} catch (err) {
		console.log(err);
		throw new Error('Fail to save User Data!');
	}

	revalidatePath('/');
	redirect('/');
};
