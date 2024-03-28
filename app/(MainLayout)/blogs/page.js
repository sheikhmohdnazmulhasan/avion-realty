import Image from "next/image";
import img from '@/public/images/root/blog/blog-cover.png';

const Blog = () => {

    return (
        <div>
            <div className="">
                <Image className='relative' src={img} alt='bannerImg' />
                <p className='text-xl md:hidden md:text-3xl absolute top-32 md:top-64 lg:top-[500px] left-12 md:left-32 lg:left-80 font-semibold'>News</p>
                <div className='h-20 w-24 md:hidden md:h-36 md:w-36 lg:h-48 lg:w-48 border absolute top-24 md:top-52 lg:top-[420px] left-8 md:left-24 lg:left-60'></div>
            </div>
        </div>
    );
};

export default Blog;