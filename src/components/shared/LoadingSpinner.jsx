import { BounceLoader } from 'react-spinners'; 

const LoadingSpinner = () => {
    const PRIMARY_ACCENT = '#7C3AED'; 
    
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-[var(--color-bg-light)]/80 backdrop-blur-sm fixed inset-0 z-50">
            <div className="flex flex-col items-center">
                
                <BounceLoader 
                    color={PRIMARY_ACCENT}
                    loading={true}
                />
                
                <p className="mt-6 text-xl font-semibold text-[var(--color-text-body)] tracking-wider">
                    ClubSphere is Loading...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;