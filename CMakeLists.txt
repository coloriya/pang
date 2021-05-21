cmake_minimum_required(VERSION 3.10)

project(squares)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)

add_executable(squares cpp/squares.cpp)


