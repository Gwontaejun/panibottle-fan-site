import React, { useState } from 'react';
import CountryList from './Country/CountryList';
import VideoList from './Video/VideoList';
import 'assets/styles/ManagementPage.scss';

const ManagementPage = () => {
	const [countryCode, setCountryCode] = useState<string | undefined>(undefined);

	return (
		<div className="management-wrapper">
			<CountryList countryCode={countryCode} onSelectCountry={(code: string) => setCountryCode(code)} />
			<VideoList countryCode={countryCode} />
		</div>
	);
};

export default ManagementPage;
