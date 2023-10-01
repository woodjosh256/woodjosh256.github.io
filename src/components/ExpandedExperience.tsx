import { Link, useLoaderData } from "react-router-dom";
import { experiences } from "../assets/data";
import { LuArrowLeft } from "react-icons/lu";

export function ExpandedExperience() {
    const id = useLoaderData() as string;

    const experience = experiences[id];

    return (
        <>
            <div className="w-full p-4 flex-grow">
                <div className="flex flex-row">
                    <Link to="/experience" className="flex flex-row items-center ml-2 text-dark-gray hover:ml-0 hover:pr-2 transition-all duration-300 hover:text-black">
                        <LuArrowLeft size="1.5em" />
                        <p className="text-lg ml-2">Back</p>
                    </Link>
                    <div className="flex-grow" />
                </div>
                <h2 className="text-center text-3xl font-bold">{experience.title}</h2>
                <div className="text-lg [&>ul]:list-disc [&>a]:text-xl [&>a]:p-4 hover:[&>a]:bg-light-sea-green [&>ul]:mb-8 [&>a]:text-black [&>a]:rounded-lg [&>a]:pt-1 [&>a]:pb-1 [&>a]:border-dashed [&>a]:border-2 [&>a]:border-sea-green p-2 md:p-8">
                    {experience.content}
                </div>
            </div>
        </>
    );
}