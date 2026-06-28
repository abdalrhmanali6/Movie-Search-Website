import { ArrowDown } from "lucide-react";
import useFilterData from "../../hooks/useFilterData";
import type { SortBy } from "../../types/types";
import { genres, languages } from "../../types/types";
import { useState } from "react";

const Filter = () => {
  const { setFilters, minRating, releaseDateFrom, releaseDateTo ,language} =
    useFilterData();
  const [choosedgenere, setChoicedGener] = useState<string[]>([]);

  const handleClick = (id: string) => {
    setChoicedGener((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((genre) => genre !== id)
        : [...prev, id];

      setFilters({ genres: updated });

      return updated;
    });
  };
  const today: string = new Date().toISOString().split("T")[0];
  return (
    <aside className="w-full lg:w-72 shrink-0 h-fit mb-4 p-6 rounded-xl space-y-8 glass-panel">
      <div>
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-6">
          Filters
        </h3>

        <div className="mb-8">
          <label className="block font-label-sm text-on-surface-variant mb-3">
            SORT BY
          </label>
          <div className="relative">
            <select
              onChange={(e) => setFilters({ sortBy: e.target.value as SortBy })}
              className="w-full bg-surface-container-high border-white/10 rounded-xl px-4 py-3 text-body-md focus:ring-primary focus:border-primary appearance-none"
            >
              <option value="popularity.desc">Popularity</option>
              <option value="primary_release_date.desc">Newest First</option>
              <option value="vote_average.desc">Highest Rated</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
              <ArrowDown />
            </span>
          </div>
        </div>

        <div className="mb-8">
          <label className="block font-label-sm text-on-surface-variant mb-3">
            GENRES
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((gener) => (
              <span
                key={gener.id}
                onClick={() => handleClick(gener.id)}
                className={`px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                  choosedgenere.includes(gener.id)
                    ? "bg-primary/15 border border-primary/30 text-primary"
                    : "bg-surface-container-high border border-white/5 text-on-surface-variant"
                }`}
              >
                {gener.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label
              htmlFor="minrating"
              className="font-label-sm text-on-surface-variant"
            >
              MINIMUM RATING
            </label>
            <span className="text-primary font-label-sm">{minRating}+</span>
          </div>
          <input
            className="w-full h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
            id="minrating"
            max="10"
            min="2"
            step="0.2"
            type="range"
            onChange={(e) => setFilters({ minRating: Number(e.target.value) })}
            value={minRating}
          />
        </div>

        <div className="mb-8">
          <label className="block font-label-sm text-on-surface-variant mb-3">
            RELEASE YEAR
          </label>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label
                htmlFor="from"
                className="block text-xs text-on-surface-variant mb-3"
              >
                From
              </label>
              <input
                className="bg-surface-container-high border-white/10 rounded-xl px-4 py-2 text-body-md focus:ring-primary"
                placeholder="From"
                id="from"
                type="date"
                value={releaseDateFrom}
                min="1920-01-01"
                max={today}
                onChange={(e) =>
                  setFilters({ releaseDateFrom: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="to"
                className="block text-xs text-on-surface-variant mb-3"
              >
                To
              </label>
              <input
                id="to"
                className="bg-surface-container-high border-white/10 rounded-xl px-4 py-2 text-body-md focus:ring-primary"
                placeholder="To"
                min="1920-01-02"
                type="date"
                value={releaseDateTo}
                max={today}
                onChange={(e) => setFilters({ releaseDateTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-label-sm text-on-surface-variant mb-3">
            LANGUAGE
          </label>
          <div className="grid grid-cols-2">
            {languages.map((lang) => (
              <label
                key={lang.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.value}
                  checked={language === lang.value}
                  onChange={(e) => setFilters({ language: e.target.value })}
                />
                <span>{lang.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filter;
