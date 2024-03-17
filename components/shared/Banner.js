import img from '@/public/images/banner.png';
import Image from 'next/image';

const Banner = ({ title }) => {

    return (
        <div className=''>
            <div className="">
                <Image className='absolute' src={img} alt='bannerImg' />
                <p className='text-3xl relative top-16 md:top-96 pl-10 md:pl-32 font-semibold'>{title}</p>
            </div>
        </div>
    );
};

export default Banner;