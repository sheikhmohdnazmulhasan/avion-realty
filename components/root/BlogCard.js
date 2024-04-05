import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
    const { title, blogImg, createdAt, _id } = blog;
    const publishDate = new Date(createdAt).toDateString();

    return (
        <Link href={`/blogs/${_id}`}><div className=" border border-[#e8bf44a0] h-80 rounded-2xl">
            <Image src={blogImg} width={800} height={800} alt="Blog Cover" className="h-52 rounded-t-2xl " />
            <div className="p-3">
                <h3 className="font-semibold">{title?.slice(0, 32)} {title.length > 32 && '...'} </h3>
                <p className="mt-2">{publishDate}</p>
            </div>
        </div></Link>
    );
};

export default BlogCard;