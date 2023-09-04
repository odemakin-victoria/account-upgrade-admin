<div className=" fixed lg:w-2/4 right-0 bg-gray-200 h-screen top-0 flex items-center justify-center w-full border border-gray-100 ">
{document ? (
    <>
        {!isImgLoaded && <Loader size={24} />}

        <object
            type="application/pdf"
            data={document}
            width="250"
            height="200"
            onLoad={() => setIsImgLoaded(true)}
            className="bg-gray-50 h-full w-full object-contain"
        ></object>
    </>
) : (
    <p>Click on a document to display</p>
)}
</div>