export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-20">
            <div className="border-gray-700 h-32 w-32 animate-spin rounded-full border-[12px] border-t-primary-600" />
        </div>
    );
}
