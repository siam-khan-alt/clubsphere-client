import React from 'react';
import ClubTableRow from '../../../components/dashboard/admin/ClubTableRow'; 


const dummyClubs = [
    { _id: 'c1', clubName: 'Photography Enthusiasts Club', managerEmail: 'manager.photo@example.com', status: 'Approved', membershipFee: 25.00, membersCount: 85, eventsCount: 12 },
    { _id: 'c2', clubName: 'Tech Innovators Guild', managerEmail: 'tech.boss@example.com', status: 'Pending', membershipFee: 0.00, membersCount: 0, eventsCount: 0 },
    { _id: 'c3', clubName: 'Hiking & Adventure Seekers', managerEmail: 'hiking.pro@example.com', status: 'Rejected', membershipFee: 15.00, membersCount: 42, eventsCount: 5 },
    { _id: 'c4', clubName: 'Book Worms Society', managerEmail: 'book.lover@example.com', status: 'Approved', membershipFee: 0.00, membersCount: 150, eventsCount: 20 },
];

const ManageClubs = () => {
    

    const handleApprove = (clubId) => {
        console.log(`Approving club: ${clubId}`);
        alert(`Approving club: ${clubId}`);
    };

    const handleReject = (clubId) => {
        console.log(`Rejecting club: ${clubId}`);
        alert(`Rejecting club: ${clubId}`);
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden"> 
            
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage All Clubs 🏢</h1>
            
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Club Name
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Manager Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fee
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Basic Stats
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {dummyClubs.map((club) => (
                            <ClubTableRow 
                                key={club._id}
                                club={club}
                                handleApprove={handleApprove}
                                handleReject={handleReject}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
                Total clubs shown: {dummyClubs.length}
            </div>
        </div>
    );
};

export default ManageClubs;


