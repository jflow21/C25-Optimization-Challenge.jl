var documenterSearchIndex = {"docs":
[{"location":"bound/#Bounds","page":"Bounds","title":"Bounds","text":"","category":"section"},{"location":"bound/#Trivial-Bound","page":"Bounds","title":"Trivial Bound","text":"","category":"section"},{"location":"bound/","page":"Bounds","title":"Bounds","text":"One trivial bound is that we can at at most travel through every single road. Thus, the sum of all of the road lengths is an upper bound. We suspect that for the large case, this actually results in a fairly good bound, as current solutions are very close to it. It is potentially even possible to attain this bound in the large case.","category":"page"},{"location":"bound/#Speed-Bound","page":"Bounds","title":"Speed Bound","text":"","category":"section"},{"location":"bound/","page":"Bounds","title":"Bounds","text":"The other bound can be attained by repeatedly choosing the road with the highest speed limit, and simulating taking it.","category":"page"},{"location":"bound/#Other-Bound-ideas","page":"Bounds","title":"Other Bound ideas","text":"","category":"section"},{"location":"bound/","page":"Bounds","title":"Bounds","text":"If we replace all of the edge speeds by the highest speed, the problem becomes easier to solve. It also becomes easier if we remove the directed aspect of the graph, and simply make every edge bidirectional. Perhaps these could lead to better bounds, but more algorithmic work is necessary to properly utilize them.","category":"page"},{"location":"algorithm/#Greedy-Algorithm","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"The basic idea for the algorithm is as follows: at each step, pick the neighboring junction that has the highest score and travel to it. The main complexity lies in choosing a good score function that will lead to desireable results. The randomized solution given in HashCode2014.jl may be thought of as the greedy solution with a constant score function.","category":"page"},{"location":"algorithm/#Motivation-for-Greedy-Algorithm","page":"Greedy Algorithm","title":"Motivation for Greedy Algorithm","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"Often, complex graph problems like this turn out to be NP-complete. While we have not formally made a reduction, this problem is intuitively hard to solve exactly, and so we suspect an approximate solution is more reasonable. Greedy solutions are particularly nice because they feed on intuition; the main thing that determines how a greedy solution will perform is the quality of the heuristic used. Moreover, while an optimal solution may be hard, an approximate solution should actually give decent results. The un-optimized, randomized solution was able to get within an order of magnitude of the upper bound, which suggests that a sufficiently-optimal greedy solution should be able to perform near-perfect.","category":"page"},{"location":"algorithm/#Score-Function","page":"Greedy Algorithm","title":"Score Function","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"There are a few natural choices for a score function: the distance of the connecting road, whether or not the connecting road has been visited, whether or not the junction has been visited, the speed of the road, etc. We ended up choosing the speed of the road, as intuitively, solutions that travel at higher speeds will cover more road. Also, we decided that a junction should have a score of zero if the connecting road has already been traveled. This will create a preference towards non-visited roads for the greedy algorithm.","category":"page"},{"location":"algorithm/#Implementing-Depth-First-Search","page":"Greedy Algorithm","title":"Implementing Depth-First Search","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"The above score function works decently well, but it also exemplifies the problem with a simple greedy algorithm for this problem: greedy algorithms work locally, but global analysis is necessary for a good solution. One solution to this is to increase the size of the locale that the greedy algorithm works in. In more specific terms, if we implement some sort of lookahead, then the greedy algorithm can choose the next junction based on how it will increase future prospects. Thus, we examine all of the paths of a fixed length ell starting from the current node, compute the path with the highest score, and choose the first node along that path to be the next node.","category":"page"},{"location":"algorithm/#Revised-Score-Function","page":"Greedy Algorithm","title":"Revised Score Function","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"Since the score function must now evaluate paths instead of individual nodes, we must change the score function from earlier. The naive way to do this is just to compute the sum of the score function applied to each node in the path; however, this actually results in worse results that the no-lookahead solution. The key observation is that while future prospects matter to an extent, what matters most is still simply increasing the amount of road traveled. Thus, we add weights so that junctions that are closer will count for more in the sum. Specifically, for a given junction, we multiply the score by the current recursion depth remaining plus one. For instance, if there is a remaining recursion depth of 0, the score is trivially 0, and for neighbors of the original node, the score is multiplied by 1 plus the fixed recursion depth. This does lead to a slightly odd phenomenon; higher recursion depths do not always result in better solutions. This is counterintuitive, as higher recursion depths means more lookahead is taking place; however, because we are combining the scores of a path in such a naive way, the score of a path can become watered down by its length, and it can also strongly avoid paths that lead to corners, even if they are necessary. Other ways of combining the individual scores of each junction could likely result in better results; for instance, we tried a decay factor instead of a linear multiplicative factor, as well as changing the constant of addition, but none of these resulted in improvement.","category":"page"},{"location":"algorithm/#Computing-in-Parallel-vs-Sequentially","page":"Greedy Algorithm","title":"Computing in Parallel vs Sequentially","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"Recall that we are working with 8 cars, and not just one. Thus, we can either compute the path of each car one after the other or all at the same time. Intuitively, it seems like computing them together should yield the best results; cars will be able to update their strategy according to the actions of other cars. While this is generally true up to a recursion depth of 9, it ceases to be true for larger recursion depths. Since the computation of the optimal solution involved a recursion depth of 12, we compute the agenda for each car sequentially. It is unclear why this phenomenon occurs, but it could potentially be mitigated by more explicitly encouraging cars to spread out; however, we did not implement that behavior. The parallel solution is still implemented, but is not exported from the package by default.","category":"page"},{"location":"algorithm/#Stochasticity","page":"Greedy Algorithm","title":"Stochasticity","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"We wondered whether introducing randomness into our solution could help produce a better result, as otherwise, our solution quality had plateaued. Specifically, we tried replacing the addition by 1 in the computation of the score function with addition by a random number between 0 and 1. While this generally decreased the solution quality, repeating this over multiple trials and taking the best result did result in improvement in some cases. However, as the recursion depth increased, the effect of the randomness seemed to become more and more negative. Moreover, using more trials requires linearly more time, and so this quickly became infeasible to run in a reasonable timeframe. With more preciseness, though, this could result in an improved solution even for larger recursion depths; however, we did not include it in the final version.","category":"page"},{"location":"algorithm/#Room-for-Improvement","page":"Greedy Algorithm","title":"Room for Improvement","text":"","category":"section"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"There are 3 main avenues for improvement that we see:","category":"page"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"Pruning,\nEnforcing car separation,\nUsing an algorithmic and non-greedy solution.","category":"page"},{"location":"algorithm/","page":"Greedy Algorithm","title":"Greedy Algorithm","text":"The second of these is likely the most straightforward, and the second requires more algorithmic thought. The third is currently intractible, as it requires significant further algorithmic development; however, we suspect that there is an algorithmic solution related to computing Euler paths.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = C25OptimizationChallenge","category":"page"},{"location":"#C25OptimizationChallenge","page":"Home","title":"C25OptimizationChallenge","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for C25OptimizationChallenge.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [C25OptimizationChallenge]","category":"page"},{"location":"#C25OptimizationChallenge.C25OptimizationChallenge","page":"Home","title":"C25OptimizationChallenge.C25OptimizationChallenge","text":"C25OptimizationChallenge\n\nThis is a package for the Optimization Challenge for the C25 course at MIT.\n\n\n\n\n\n","category":"module"},{"location":"#C25OptimizationChallenge.CityProblemInst","page":"Home","title":"C25OptimizationChallenge.CityProblemInst","text":"CityProblemInst\n\nThis stores an instance of the problem for internal use.\n\n\n\n\n\n","category":"type"},{"location":"#C25OptimizationChallenge.CityProblem-Tuple{HashCode2014.City}","page":"Home","title":"C25OptimizationChallenge.CityProblem","text":"CityProblem(city_string)\n\nThis function parses a city string and returns a CityProblemInst object. The city string is a string that contains the description of the city. The format of the string is described in the problem statement.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.breadth_first-Tuple{C25OptimizationChallenge.CityProblemInst}","page":"Home","title":"C25OptimizationChallenge.breadth_first","text":"breadth_first(city)\n\nThis function tries to find a good solution to the problem using something similar to a breadth-first search.\n\nThe algorithm used here is based on the random walk algorithm presented in class. There are two key differences:\n\nThere is a preference to take streets that have not been visited yet.\nFor a street that has not been visited yet, if there are multiple streets that have not been visited yet, the street with the highest speed is chosen.\n\nThe first of these prevents the algorithm from backtracking too much. The second of these is simply a heuristic that results in favorable behavior; it is generally better to travel faster.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.generate_solution-Tuple{}","page":"Home","title":"C25OptimizationChallenge.generate_solution","text":"generate_solution(city, num_times=10, method=breadth_first)\n\nThis function generates a solution to the problem using the current preferred method.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.partial_dfs-Tuple{Any, Int64, Int64, Any, Any, Any}","page":"Home","title":"C25OptimizationChallenge.partial_dfs","text":"partial_dfs(graph, node, depth, visited_nodes, visited_edges, distances, times)\n\nThis function recursively calculates the score of a given node.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.repeat-Tuple{Any, Any, Any}","page":"Home","title":"C25OptimizationChallenge.repeat","text":"repeat(city, num_times, method)\n\nThis function tries to find a good solution to the problem by repeatedly calling method and keeping the best solution found. This should result in improvements if method is randomized.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.select_node-NTuple{6, Any}","page":"Home","title":"C25OptimizationChallenge.select_node","text":"select_node(current, candidates, graph, visited_nodes, visited_edges, distances, times)\n\nThis function selects the next node to traverse from a list of candidates by assigning each node a score and choosing the highest. The score is based on how good the best path starting with that node is.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.small_bound-Tuple{C25OptimizationChallenge.CityProblemInst}","page":"Home","title":"C25OptimizationChallenge.small_bound","text":"small_bound(city::CityProblemInst)\n\nThis bounds the solution by repeatedly choosing the fastest street until the time is up.\n\n\n\n\n\n","category":"method"},{"location":"#C25OptimizationChallenge.speed-Tuple{Any, Any}","page":"Home","title":"C25OptimizationChallenge.speed","text":"speed(street)\n\nReturns the speed of a street.\n\n\n\n\n\n","category":"method"},{"location":"implementation/#Implementation-Details","page":"Implementation Details","title":"Implementation Details","text":"","category":"section"},{"location":"implementation/","page":"Implementation Details","title":"Implementation Details","text":"In this document, we detail the various performance optimizations made to allow our algorithm to run in a reasonable timeframe.","category":"page"},{"location":"implementation/#Graph-Storage","page":"Implementation Details","title":"Graph Storage","text":"","category":"section"},{"location":"implementation/","page":"Implementation Details","title":"Implementation Details","text":"We store the city map as a graph using the Graphs.jl package; this allows for O(1) time checking of whether an edge exists between two junctions. Moreover, it allows us to quickly generate all of the neighbors of a given junction. We store the times, distances, and speed of each street as a dictionary to give O(1) access time. We experimented with using a weighted graph and storing the speeds as the weight of the edges, but this was slower than using the dictionary method. During execution of the algorithm itself, we store whether or not each node has been visited using a Boolean vector, and we store whether or not each edge has been visited using a set. Theoretically, one could use a Boolean vector to store edge visitations as well, but we could not think of any easy way to convert an edge into an index uniquely and figured the set method would be good enough.","category":"page"},{"location":"implementation/#General-Speed-Optimizations","page":"Implementation Details","title":"General Speed Optimizations","text":"","category":"section"},{"location":"implementation/","page":"Implementation Details","title":"Implementation Details","text":"We tried to perform as many general speed optimizations as possible, testing the speed after each optimization to make sure it actually increased the speed. One such optimization was precomputing the speed of each edge, which resulted in around a 5% improvement in speed. We made sure that every written function and computation was type stable, and we used the most appropriate types for each scenario (e.g., prefer integers over floats). The main focus of optimization was the partial_dfs function, as we determined that this is where the bulk of the computation time was. As written, there is little more optimization possible in this function without substantial restructuring or using different data types. Performance was one motivating factor in choosing our score function for the algorithm: each score computation takes one addition, one multiplication, and one dictionary access. There is some potential optimization left in that we are repeatedly pushing and popping a set, which, though O(1), is still relatively expensive.","category":"page"}]
}
