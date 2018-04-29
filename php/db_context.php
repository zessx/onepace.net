<?php
include_once 'config.php';
include_once 'logger.php';

class db_context {
    private $connection;
    function connect() {
        $this->connection = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SOCKET);
        if (mysqli_connect_errno()) {
            log_error('Failed to connect to MySQL: ' . mysqli_connect_error());
        }
        $this->connection->set_charset(DB_CHARSET);
    }
    function disconnect() {
        mysqli_close($this->connection);
    }
    function query($sql, $params = null, $param_types = null) {
        $connection = $this->connection;
        if($params != null && $param_types != null) {
            $stmt = $connection->prepare($sql);
            if($stmt === false) {
                log_error('Wrong SQL: ' . $sql . ' Error: ' . $connection->errno . ' ' . $connection->error, E_USER_ERROR);
            }
            $a_params = [];
            $a_params[] = &$param_types;
            foreach ($params as $p) {
                $a_params[] = &$p;
            }
            call_user_func_array(array($stmt, 'bind_param'), $a_params);
            if(!$stmt->execute()) {
                log_error($stmt->error);
            }
            if(!$result = $stmt->get_result()) {
                log_error($stmt->error);
            }
            $stmt->close();
        } else if (!$result = mysqli_query($connection, $sql)) {
            log_error("Error description: " . mysqli_error($connection));
        }
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }
    function prepare($sql) {
        $connection = $this->connection;
        $stmt = $connection->prepare($sql);
        if($stmt === false) {
            log_error('Wrong SQL: ' . $sql . ' Error: ' . $connection->errno . ' ' . $connection->error, E_USER_ERROR);
        }
        return $stmt;
    }
    function execute($stmt) {
        if(!$stmt->execute()) {
            log_error($stmt->error);
        }
        $stmt->close();
    }
}
