'use client'
import Navbar from "@/components/dashboard/Navbar";
import InquiryCard from "@/components/dashboard/admin/InquiryCard";
import useAgentInquiries from "@/hooks/useAgentInquiries";
import useUser from "@/hooks/useUser";
import * as XLSX from 'xlsx';

const Inquiry = () => {
  const { data: user } = useUser();
  const [data, isLoading] = useAgentInquiries()

  const handleDownloadLeadsDataAsXLSX = async () => {
    try {

      const modifiedData = data.map(({ _id, createdAt, updatedAt, __v, agent, ...rest }) => rest)

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
      XLSX.writeFile(workbook, `avion-inquiry(agent).xlsx`);

    } catch (error) {
      console.log('Error in fetching or generating XLSX:', error);
    }
  };


  if (user.role !== 'agent') {
    return (
      <div className="grid h-screen place-content-center bg-[#0A0909] px-4">
        <h1 className="uppercase tracking-widest text-gray-200">401 | Unauthorized</h1>
      </div>
    )

  } else if (isLoading) {
    return <h1 className="flex justify-center items-center h-screen font-semibold">Loading!</h1>

  } else if (!data.length) {
    return <h1 className="flex justify-center items-center h-screen font-semibold">No Data!</h1>

  } else {

    return (
      <div>
        <Navbar title="Inquiry" />

        <div className="flex justify-end mt-20 mb-3">
          <button className="py-2 px-3 bg-[#886c2b] hover:bg-[#8f7537] transition-all hover:scale-105" onClick={handleDownloadLeadsDataAsXLSX}>Download All</button>
        </div>

        <div className=" mb-8 w-full text-sm border border-[#E4B649]">

          <div className="flex w-full items-center py-2 border-b border-[#E4B649]">
            <div className="w-[28.33%] border-r border-[#E4B649] py-2 text-center">
              <p className="font-semibold">Name</p>
            </div>
            <div className="w-[28.33%]  border-r border-[#E4B649] py-2 text-center">
              <p className="font-semibold">Email</p>
            </div>
            <div className="w-[28.33%]  border-r border-[#E4B649] py-2 text-center">
              <p className="font-semibold">Mobile</p>
            </div>
            <div className="w-[15%]  py-2 text-center">
              <p className="font-semibold">Action</p>
            </div>
            <hr />
          </div>

          {data.map(i => <InquiryCard key={i._id} inquiry={i} role={'agent'} />)}

        </div>
      </div>
    );
  }


};

export default Inquiry;
