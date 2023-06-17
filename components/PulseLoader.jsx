import PulseLoader from 'react-spinners/PulseLoader';

export default function LoadingBar({ loading }) {
  return (
    <div className="full">
      <PulseLoader loading={loading} color="#36d7b7" speedMultiplier={0.6} />
    </div>
  );
}
