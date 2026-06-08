import React, { useState } from "react";
import { MagnifyingGlassIcon, CheckIcon } from "@heroicons/react/24/outline";

/**
 * Reusable multi-select filter used across the sidebar.
 *
 * Props:
 *  - options:   string[] list of selectable values
 *  - selected:  string[] currently selected values
 *  - onChange:  (next: string[]) => void
 *  - searchable: show a search box (default: auto when options > 8)
 *  - placeholder: search box placeholder
 *  - grid:      when set, renders as a pill grid with this many columns
 *               instead of a checkbox list
 *  - limit:     when set, only the first N options show; a "Load more" button
 *               reveals the next N on each click (selected options always stay
 *               visible). Great for long lists.
 */
const CheckboxFilter = ({
  options = [],
  selected = [],
  onChange,
  searchable,
  placeholder = "Search…",
  grid,
  limit,
}) => {
  const [search, setSearch] = useState("");
  const [showCount, setShowCount] = useState(limit || 0);

  const showSearch = searchable ?? options.length > 8;
  const q = search.trim().toLowerCase();
  const matched = showSearch && q
    ? options.filter((o) => o.toLowerCase().includes(q))
    : options;

  // Show only the first `showCount` (grown by "Load more") until the user
  // searches, but never hide a currently-selected option.
  const step = limit || 10;
  let visible = matched;
  let hiddenCount = 0;
  if (limit && !q && matched.length > showCount) {
    const head = matched.slice(0, showCount);
    const extraSelected = matched
      .slice(showCount)
      .filter((o) => selected.includes(o));
    visible = [...head, ...extraSelected];
    hiddenCount = matched.length - visible.length;
  }

  const toggle = (value) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );

  return (
    <div className="w-full">
      {showSearch && (
        <div className="relative mb-2">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white"
          />
        </div>
      )}

      {grid ? (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))` }}
        >
          {visible.length === 0 ? (
            <p className="col-span-full px-1 py-2 text-sm text-gray-400">No results</p>
          ) : (
            visible.map((value) => {
              const active = selected.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggle(value)}
                  className={`rounded-lg border px-2 py-2 text-center text-xs font-semibold transition ${
                    active
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  {value}
                </button>
              );
            })
          )}
        </div>
      ) : (
        <ul className="filter-list-scroll max-h-56 space-y-0.5 overflow-y-auto pr-1">
          {visible.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-400">No results</li>
          ) : (
            visible.map((value) => {
              const checked = selected.includes(value);
              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => toggle(value)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                      checked ? "text-primary" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition ${
                        checked ? "border-primary bg-primary" : "border-gray-300 bg-white"
                      }`}
                    >
                      {checked && <CheckIcon className="h-3 w-3 stroke-[3] text-white" />}
                    </span>
                    <span className={`truncate ${checked ? "font-semibold" : ""}`}>{value}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowCount((c) => c + step)}
          className="mt-2 w-full rounded-lg border border-dashed border-gray-200 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary-50"
        >
          Load {Math.min(hiddenCount, step)} more
          <span className="text-gray-400"> ({hiddenCount} left)</span>
        </button>
      )}

      {selected.length > 0 && (
        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="text-xs font-medium text-gray-500">{selected.length} selected</span>
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-semibold text-red-500 transition hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
