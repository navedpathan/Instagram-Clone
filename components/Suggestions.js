import { useState, useEffect } from "react";
import faker from "@faker-js/faker";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const suggestions = [...Array(5)].map((_, index) => (
            {
                ...faker.helpers.contextualCard(),
                id: index
            }
        ));
        setSuggestions(suggestions);
    }, [])

    return (
        <div className="mt-4 ml-10">
            <div className="flex justify-between items-center tet-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>

            {suggestions.map((profile) => (
                <div
                    key={profile.id}
                    className='flex items-center justify-between mt-3'>
                        <img src={profile.avatar}
                        className='w-10 h-10 rounded-full border p-[2px]' alt="" />

                        <div className="flex-auto ml-4 mr-6">
                            <h2 className="font-semibold text-sm">{profile.username}</h2>
                            <h3 className="text-xs text-gray-400">Works at {profile.company.name}</h3>
                        </div>

                        <button className="font-semibold hover:text-blue-600 text-blue-400 text-sm">Follow</button>
                </div>

            ))}

        </div>
    );
}

export default Suggestions