

const SectionTitle = ({heading,subHeading}) => {
    return (
        // vule ai folder a lakhe felsi
        <div className="mx-auto text-center md:w-4/12 my-8">
             <p className="text-yellow-600 mb-2">{heading}</p>
             <h3 className="uppercase text-4xl border-y-4 py-4">{subHeading}</h3>
        </div>
    );
};

export default SectionTitle;