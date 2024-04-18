import Image from "next/image";
import bed from '@/public/images/dashboard/listing/bed.svg';
import bathroomSvg from '@/public/images/dashboard/listing/bathroom.svg';
import sqft from '@/public/images/dashboard/listing/sqft.svg';
import locationSvg from '@/public/images/dashboard/listing/location.svg';
import leadsIcon from '@/public/images/dashboard/agent/leads.svg';
import axios from "axios";
// import jsPDF from "jspdf";
// import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const LeadsCard = ({ list }) => {
    const { title, bedroom, bathroom, areaSqFt, location, images, leads, _id } = list;


    // download as PDF
    // const handleDownloadLeadsDataAsPDF = async (_id) => {
    //     try {
    //         const serverResponse = await axios.get(`/api/agent/leads?list-id=${_id}`);
    //         const modifiedData = serverResponse.data.map(({ _id, leadFor, createdAt, updatedAt, __v, ...rest }) => ({
    //             ...rest
    //         }));

    //         const doc = new jsPDF();
    //         doc.autoTable({
    //             head: [Object.keys(modifiedData[0])],
    //             body: modifiedData.map(obj => Object.values(obj))
    //         });

    //         // Save PDF
    //         doc.save('data.pdf');
    //     } catch (error) {
    //         console.log('Error in fetching or generating PDF:', error);
    //     }
    // };

    const handleDownloadLeadsDataAsXLSX = async (_id) => {
        try {
            const serverResponse = await axios.get(`/api/agent/leads?list-id=${_id}`);
            const modifiedData = serverResponse.data.map(({ _id, leadFor, createdAt, updatedAt, __v, ...rest }) => rest)

            // Convert JSON data to worksheet
            const worksheet = XLSX.utils.json_to_sheet(modifiedData);

            // Customize column width
            const columnWidths = [
                { wch: 35 },
                { wch: 30 },
                { wch: 30 },

            ];

            worksheet['!cols'] = columnWidths;

            // Make specific properties bold
            const boldCells = ['A1', 'B1'];
            boldCells.forEach(cell => {
                worksheet[cell].s = { font: { bold: true } }; // Set font to bold
            });

            // Create workbook and append worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            // Save XLSX
            XLSX.writeFile(workbook, `${title}'s Leads.xlsx`);

        } catch (error) {
            console.log('Error in fetching or generating XLSX:', error);
        }
    };

    return (
        <div>
            <div>
                <div className="">
                    <div className="flex items-center">
                        <div className="w-[45%] p-5">
                            <div className="flex items-center gap-3">
                                <Image width={96} height={96} src={images[0]} alt="Listing image" className="w-16 h-16 rounded-md" />
                                <div className="">
                                    <h3 className="text-[20px] font-bold mb-2">{title}</h3>
                                    <div className="flex gap-5">

                                        {/* bed */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bed} alt="Bedroom svg" />
                                            <span>{bedroom}</span>
                                        </div>

                                        {/* bathroom */}
                                        <div className="flex items-center gap-2">
                                            <Image src={bathroomSvg} alt="bathroom svg" />
                                            <span>{bathroom}</span>
                                        </div>

                                        {/* sqft */}
                                        <div className="flex items-center gap-2">
                                            <Image src={sqft} alt="scale svg" />
                                            <span>{areaSqFt} sq. ft.</span>
                                        </div>
                                    </div>

                                    {/* location */}
                                    <div className="flex items-center gap-2">
                                        <Image src={locationSvg} alt="Apartment Location svg" />
                                        <span className="mt-2">{location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="w-[30%] text-center flex justify-center items-center gap-2 font-semibold">
                            <Image src={leadsIcon} alt="leadsIcon" />
                            <p>{leads} Leads</p>
                        </div>

                        {/* updated on */}
                        <div className={`w-[25%] text-center  ${!leads && 'opacity-20'}`}>
                            <button disable={!leads} className={`py-2 px-5 ${leads && 'hover:bg-[#8c7234] transition-all hover:scale-105'} bg-[#835C00] ${!leads && 'cursor-not-allowed'} rounded-3xl`} onClick={() => handleDownloadLeadsDataAsXLSX(_id)}>Download All</button>
                        </div>

                    </div>
                    <div className="mx-3">
                        <hr className="opacity-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsCard;