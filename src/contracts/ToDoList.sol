// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract ToDoList {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, string content, bool completed);

    mapping(address => Task[]) private usersTasks;

    function add(string memory _content) public {
        require(bytes(_content).length != 0, "Content is required");
        uint256 taskCount = usersTasks[msg.sender].length;
        usersTasks[msg.sender].push(Task(taskCount, _content, false));
        emit TaskCreated(taskCount, _content, false);
    }

    function complete(uint256 _id) public {
        Task[] storage tasks = usersTasks[msg.sender];
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _id) {
                tasks[i].completed = true;
                emit TaskCompleted(i, tasks[i].content, tasks[i].completed);
            }
        }
    }

    function remove(uint256 _id) public {
        Task[] storage tasks = usersTasks[msg.sender];
        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _id) {
                delete tasks[i];
            }
        }
    }
    

    function retrieve() public view returns (Task[] memory) {
        return usersTasks[msg.sender];
    }
}