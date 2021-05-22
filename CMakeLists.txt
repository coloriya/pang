cmake_minimum_required(VERSION 3.10)

project(pang)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)

add_executable(pang cpp/pang.cpp)


