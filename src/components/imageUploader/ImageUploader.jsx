'use client';
import { useGlobalData } from '@/hooks/useGlobalData';
import { UploadButton } from '@/utils/uploadthing';

export default function ImageUploader() {
	const { setImgUrl } = useGlobalData();
	return (
		<div>
			<UploadButton
				endpoint='imageUploader'
				onClientUploadComplete={res => {
					console.log('Files: ', res);
					console.log(res[0].url);
					setImgUrl(res[0].url);
					alert('Upload Completed');
				}}
				onUploadError={error => {
					alert(`ERROR! ${error.message}`);
				}}
			/>
		</div>
	);
}
