import Image from "next/image";
import img from '@/public/images/root/blog/blog-cover.png';

const Blog = () => {

    return (
        <div>

            {/* banner */}
            <div className="">
                <Image className='relative' src={img} alt='bannerImg' />

            </div>

            {/*  */}
            <div className=" text-center">
                <h1 className="text-2xl">NEWS</h1>
                <p>Stay informed about the most recent developments</p>
            </div>

            {/* card */}
            <div className="">
                
            </div>
        </div>
    );
};

export default Blog;