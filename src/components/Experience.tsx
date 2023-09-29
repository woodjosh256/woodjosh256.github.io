import { ReactNode, useEffect, useReducer, useRef, useState } from "react";
import { ExperienceItemData, FilterList } from "./common/FilterList";
import { ExpTypes, Tags, experiences } from "../assets/data";
import { ExperienceItem } from "./common/ExperienceItem";
import { YearScrollBar } from "./common/YearScrollBar";

export function Experience() {
    const [experienceData, setExperienceData] = useState<ExperienceItemData[]>(
        []
    );

    const [tagFilters, setTagFilters] = useState<Tags[]>([]);
    const [typeFilters, setTypeFilters] = useState<ExpTypes[]>([]);

    const [currentExperience, setCurrentExperience] = useState<number>(0);

    const filterListRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);

    function updateExperienceData() {
        let newExperienceData: ExperienceItemData[] = [];

        let index = 0;
        for (let key in experiences) {
            let tagMatch = true;
            let experience = experiences[key];

            tagFilters.forEach((filterTag) => {
                if (experience.tags.includes(filterTag)) {
                    tagMatch = false;
                }
            });

            if (tagMatch) {
                newExperienceData.push({
                    component: (
                        <ExperienceItem experience={experience} key={key} />
                    ),
                    data: experience,
                });
            }
        }

        newExperienceData.sort((a, b) => {
            return b.data.date.getTime() - a.data.date.getTime();
        });

        setExperienceData(newExperienceData);
    }

    useEffect(() => {
        updateExperienceData();
    }, [tagFilters, typeFilters]);

    useEffect(() => {
        if (!(filterListRef.current && experienceRef.current)) {
            return;
        }
        function handleParentScroll(e: WheelEvent) {
            if (!filterListRef.current) return;
            filterListRef.current.scrollTop += e.deltaY;
        }

        experienceRef.current.addEventListener("wheel", handleParentScroll, {
            passive: false,
        });
        return () => {
            if (!experienceRef.current) return;
            experienceRef.current.removeEventListener(
                "wheel",
                handleParentScroll
            );
        };
    }, []);

    return (
        <div
            ref={experienceRef}
            className="flex-grow flex flex-row h-full max-h-full overflow-y-auto"
        >
            <FilterList
                ref={filterListRef}
                experienceData={experienceData}
                setCurrentExperience={setCurrentExperience}
                className="flex-grow max-h-full overflow-y-auto pl-8 no-scrollbar"
            />
        </div>
    );
}