import React from 'react';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-green-800">Terms and Conditions for Participation</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
          <li>
            <span className="font-semibold text-red-600">Application & Payment</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Participation is confirmed only after full payment and a completed application form.</li>
              <li>Allocation of space is first come, first served.</li>
              <li>Payments are non-refundable, even if an exhibitor cancels or fails to attend.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Exhibition Booths & Space</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Exhibitors must stick to their allocated spaces.</li>
              <li>Sharing or subletting of space is prohibited.</li>
              <li>Booth designs must be approved in advance and must not obstruct other exhibitors.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Setup & Dismantling</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Booth setup must be completed before the opening.</li>
              <li>Exhibitors may not dismantle before the official closing of the fair.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Conduct & Use of Premises</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Exhibitors are responsible for the cleanliness and security of their booths.</li>
              <li>Offensive or dangerous displays are not allowed.</li>
              <li>Noise levels must be kept within acceptable limits.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Security & Insurance</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>General security will be provided, but exhibitors are advised to secure their valuables.</li>
              <li>The organizers are not liable for losses, damages, or injuries.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Advertising & Promotions</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>All promotional materials and activities within the fairgrounds must be approved by the organizers.</li>
              <li>Loud music, live performances, or mascots need special permission.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Compliance</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Exhibitors must comply with all local laws, safety, and fire regulations.</li>
              <li>The organizers reserve the right to remove non-compliant exhibitors.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Force Majeure</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The organizers are not liable for cancellations or disruptions due to events beyond their control (e.g., natural disasters, government action).</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-red-600">Disputes</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Any disputes will be resolved under Nigeria law.</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsModal;