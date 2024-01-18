import { revalidatePath } from 'next/cache';
import { connectDB } from './connectDB';
import { Post } from './models';
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

//인수로 받은 현재 페이지번호에 따라 다음의 정보를 반환하는 함수
//{전체 데이터갯수, 출력될 포스트 배열, 현재페이지에 보일 데이터 갯수}
export const getPostsPage = async page => {
	const nums = 6;

	try {
		connectDB();
		const total = await Post.find().sort({ _id: -1 }).count();
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(nums) //nums갯수만큼 데이터 출력 제한
			.skip(nums * (page - 1)); //현재 페이지 번호에 따라 출력한 데이터 시작순번 지정해서 스킵할 데이터수 지정
		return { total, posts, nums };
	} catch (err) {
		console.log(err);
		throw new Error('Fail to fetch All posts data!!');
	}
};

export const addPost = async formData => {
	'use server';

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
	'use server';

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
	'use server';

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
