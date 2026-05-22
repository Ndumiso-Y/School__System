import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Filter } from "lucide-react";
import StatusBadge from "./StatusBadge";

export const DataTable = ({
  title,
  data = [],
  columns = [], // Array of { key, header, render(val, item) }
  searchKey,
  searchPlaceholder = "Search record...",
  filterKey,
  filterOptions = [], // Array of strings/objects
  filterPlaceholder = "All Statuses",
  onAddClick,
  addLabel = "Add Record",
  actionRequiredTier = 1,
  currentTier = 2,
}) => {
  const [search, setSearch] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handles placeholder actions
  const handleActionClick = (actionName, item) => {
    alert(
      `[Demo Feature] You triggered "${actionName}" for "${
        item?.name || item?.id || item?.invoiceNo || item?.title || "selected item"
      }". \n\nIn Phase 2, this will connect to the backend database.`
    );
  };

  // Filter & Search logic
  const filteredData = data.filter((item) => {
    // Search match
    const searchVal = searchKey && item[searchKey] ? String(item[searchKey]).toLowerCase() : "";
    const matchesSearch = searchVal.includes(search.toLowerCase());

    // Status filter match
    let matchesFilter = true;
    if (filterKey && filterVal) {
      matchesFilter = String(item[filterKey]).toLowerCase() === filterVal.toLowerCase();
    }

    return matchesSearch && matchesFilter;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Table Header / Action Bar */}
      <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/30">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredData.length} records matching current criteria.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search box */}
          {searchKey && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 w-52 bg-white"
              />
            </div>
          )}

          {/* Filter dropdown */}
          {filterKey && (
            <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-2 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
              <select
                value={filterVal}
                onChange={(e) => {
                  setFilterVal(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-slate-700 border-none outline-none pr-5 cursor-pointer"
              >
                <option value="">{filterPlaceholder}</option>
                {filterOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add button */}
          {onAddClick && (
            <button
              onClick={
                currentTier >= actionRequiredTier
                  ? onAddClick
                  : () =>
                      alert(
                        `[Tier Restriction] This operation requires Tier ${actionRequiredTier} or higher. Please upgrade using the switcher.`
                      )
              }
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all ${
                currentTier >= actionRequiredTier
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              {columns.map((col) => (
                <th key={col.key} className="py-3 px-6">
                  {col.header}
                </th>
              ))}
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={item.id || item.invoiceNo || idx} className="hover:bg-slate-50/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-6 font-medium text-slate-800">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  {/* Action items column */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleActionClick("Edit Record", item)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleActionClick("Delete Record", item)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-rose-600 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center text-slate-400">
                  No records found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination panel */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/20">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
