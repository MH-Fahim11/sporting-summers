import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
const useClass = () => {
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure(`/allClasses`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [classes, refetch]

}
export default useClass;