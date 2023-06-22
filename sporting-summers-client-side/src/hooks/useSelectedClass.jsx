import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const useSelectedClass = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: SelectedClass = [] } = useQuery({
        queryKey: ['selectedClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selectedClass?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [SelectedClass, refetch]

}
export default useSelectedClass;