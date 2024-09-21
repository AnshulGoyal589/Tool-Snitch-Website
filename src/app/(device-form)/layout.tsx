
export default function DeviceFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container">
            <h1>Device Form</h1>
            {children}
        </div>
    );
}