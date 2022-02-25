interface KMP_data {
	title: Array<string>;
	author: Array<string>;
}

const KMP: any = (VideoList: any, Siri_message: string) => {
	let Candidate_Author: Array<string> = [],
		Candidate_Title: Array<string> = [];

	VideoList.forEach((video: any) => {
		if (kmp_match(video.author, Siri_message)) {
			Candidate_Author.push(video._id);
		}
		if (kmp_match(video.title, Siri_message)) {
			Candidate_Title.push(video._id);
		}
	});
	const data: KMP_data = {
		title: Candidate_Title,
		author: Candidate_Author
	};
	return data;
};

const kmp_match: any = (needle: string, heap: string) => {
	let n = needle.length,
		m = heap.length;
	let pi: Array<number> = make_pi(needle);
	let begin: number = 0,
		matched: number = 0;
	while (begin <= m - n) {
		if (heap[begin + matched] == needle[matched] && matched < n) {
			matched += 1;
			if (matched == n) {
				return true;
			}
		} else {
			if (matched == 0) {
				begin += 1;
			} else {
				begin += matched - pi[matched - 1];
				matched = pi[matched - 1];
			}
		}
	}
	return false;
};

const make_pi: any = (needle: string) => {
	let n = needle.length;
	let pi: Array<number> = new Array(n);
	let begin = 1,
		matched = 0;
	while (matched + begin < n) {
		if (needle[matched + begin] === needle[matched]) {
			matched += 1;
			pi[matched + begin - 1] = matched;
		} else {
			if (matched == 0) {
				begin += 1;
			} else {
				begin += matched - pi[matched - 1];
				matched = pi[matched - 1];
			}
		}
	}
	return pi;
};

export default KMP;
