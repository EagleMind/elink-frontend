type Props = {
  pageSize: number,
  setPageSize: (size: number) => void,
  page: number,
  setPage: (arg: number) => void,
  totalPages: number,
}
const BottomNav = ({
  pageSize,
  setPageSize,
  page,
  setPage,
  totalPages,
}: Props) => {
  return (
    <div className="flex w-full md:w-full md:justify-end justify-between  items-center  p-3 bottom-0 bg-white ">
      {" "}
      {/* Added justify-between */}
      <div className="flex-shrink flex">
        <div className="text-[14px] text-grey1">Rows per page : </div>
        <select
          className="text-[14px] border-none rounded text-[#4B506D] outline-none mr-16"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-shrink text-center mr-5">
        {" "}
        {/* Added text-center */}
        <span className="text-[14px] text-grey1">
          {(page - 1) * pageSize + 1}-{Math.min(page)}
        </span>{" "}
      </div>
      <div className="flex-shrink flex mr-2 gap-1">
        {" "}
        {/* Added flex */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-3"
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.535 0.514893L0.0500031 8.99989L8.535 17.4849L9.95 16.0709L2.878 8.99989L9.95 1.92889L8.535 0.514893Z"
              fill="#9FA2B4"
            />
          </svg>
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-3"
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.465 17.4851L9.95 9.00011L1.465 0.515106L0.0499973 1.92911L7.122 9.00011L0.0499973 16.0711L1.465 17.4851Z"
              fill="#9FA2B4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
