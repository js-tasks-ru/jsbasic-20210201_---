function showSalary(users, age) {
	return users.filter(function(user) {
		return user.age <= age
	}).map(function(user) {
		return `${user.name}, ${user.balance}`;
	}).join(`\n`);
}
