import Image from "next/image";

const BlogCard = ({ blog }) => {
    const { title, blogImg, createdAt } = blog;


    return (
        <div className=" border border-[#e8bf44a0] h-80 rounded-lg">
            <Image src={blogImg} width={800} height={800} alt="Blog Cover" className="h-52 rounded-t-lg" />
        </div>
    );
};

export default BlogCard;